from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status

from .serializers import ArticleSerializer
from .documents import ArticleDocument

from elasticsearch_dsl.query import Q

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.


class SearchArticleView(APIView, LimitOffsetPagination):
    search_serializer = ArticleSerializer
    search_document = ArticleDocument


    @swagger_auto_schema(operation_description="Search articles",manual_parameters=[
        openapi.Parameter(
            name="query",
            in_=openapi.IN_PATH,
            type=openapi.TYPE_STRING,
            required=True,
            description="Search query",
        )
    ])
    def get(self, request, query):

        try:
            
            query = query or request.query_params.get('query', '')

            q = Q(
                "multi_match",
                query=query,
                fields=[
                    "id",
                    "title",
                    "content",
                    "tags",
                    "categories",
                    "author",
                    "slug",
                ],
            )
            
            search = self.search_document.search().query(q)
            response = search.execute()
            
            # print("Executed")
            
            # return Response({"ok":200})
            
            results = self.paginate_queryset(response,request,view=self)
            
            print("Results : ",results)
            
            serializer = self.search_serializer(results,many=True)

            return self.get_paginated_response(serializer.data)
        
        except Exception as e:
            return HttpResponse(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
