
from rest_framework.decorators import (
    api_view,
    permission_classes,
    parser_classes,
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import (
    RegisterSerializer,
    UserSerializer,
    StudentProfileSerializer,
)

import cloudinary.uploader


# --------------------------------------------------
# HOME API
# --------------------------------------------------

@api_view(['GET'])
def home(request):
    return Response({
        "message": "Welcome to PlacementReady API",
        "status": "success",
    })


# --------------------------------------------------
# STUDENT REGISTRATION
# --------------------------------------------------

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        return Response(
            {
                "message": "Registration successful",
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
    )


# --------------------------------------------------
# AUTHENTICATED USER PROFILE
# --------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response({
        "message": "Authenticated user profile",
        "user": UserSerializer(request.user).data,
    })


# --------------------------------------------------
# VIEW AND UPDATE STUDENT PROFILE
# --------------------------------------------------

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def student_profile(request):
    profile = request.user.profile

    if request.method == 'GET':
        serializer = StudentProfileSerializer(profile)
        return Response(serializer.data)

    serializer = StudentProfileSerializer(
        profile,
        data=request.data,
    )

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "Profile updated successfully",
            "profile": serializer.data,
        })

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
    )


# --------------------------------------------------
# UPLOAD RESUME TO CLOUDINARY
# --------------------------------------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_resume(request):

    # Get the uploaded PDF
    resume = request.FILES.get('resume')

    if not resume:
        return Response(
            {"error": "Please select a resume."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Validate file type
    if resume.content_type != 'application/pdf':
        return Response(
            {"error": "Only PDF resumes are allowed."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Maximum file size: 5 MB
    if resume.size > 5 * 1024 * 1024:
        return Response(
            {"error": "Resume must be 5 MB or smaller."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        # Upload resume to Cloudinary
        result = cloudinary.uploader.upload(
            resume,
            resource_type="raw",
            type="private",
            folder="placementready/resumes",
            public_id=f"student_{request.user.id}_resume",
            overwrite=True,
            invalidate=True,
        )

        # Save the uploaded resume ID to the student profile
        profile = request.user.profile
        profile.resume_public_id = result["public_id"]

        profile.save(
            update_fields=["resume_public_id"]
        )

        return Response(
            {
                "message": "Resume uploaded successfully.",
                "resume_public_id": profile.resume_public_id,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        # Print the actual error in the Django terminal
        print("CLOUDINARY UPLOAD ERROR:", repr(e))

        # Temporary debugging response for local development
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )