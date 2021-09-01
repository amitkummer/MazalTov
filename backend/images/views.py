from re import compile

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_200_OK

imageId = compile(r'^/api/images/(\d+)/')

@api_view()
def imageAuth(request):
    match = imageId.match(request.headers['X-Original-URI'])
    if match == None:
        return Response(status=HTTP_400_BAD_REQUEST)
    if match.group(1) == str(request.user.id):
        return Response(status=HTTP_200_OK)
    return Response(status=HTTP_401_UNAUTHORIZED)