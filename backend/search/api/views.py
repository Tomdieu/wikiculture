from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status

from .serializers import ArticleSerializer
from .documents import ArticleDocument

from elasticsearch_dsl.query import Q

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class SearchArticleView(APIView):
    search_serializer = ArticleSerializer
    search_document = ArticleDocument
    pagination_class = PageNumberPagination

    @swagger_auto_schema(
        operation_description="Search articles",
        manual_parameters=[
            openapi.Parameter(
                name="page",
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_INTEGER,
                required=False,
                description="Page number for pagination",
            ),
        ],
    )
    def get(self, request, query):
        try:
            q = Q(
                "query_string",
                query="*" + query + "*",
                fields=[
                    "title",
                    "content",
                    "tags",
                    "categories",
                    "author.username",
                    "author.first_name",
                    "author.last_name",
                    "slug",
                ],
                fuzziness="auto",
            ) & Q(
                "bool",
                should=[
                    Q("match", approved=True),
                    Q("match", is_published=True),
                ],
            )

            search = self.search_document.search()
            search = search.query(q)
            response = search.execute()

            paginator = self.pagination_class()
            paginated_response = paginator.paginate_queryset(
                response, request, view=self
            )

            if paginated_response is not None:
                serializer = self.search_serializer(paginated_response, many=True)
                return paginator.get_paginated_response(serializer.data)

            serializer = self.search_serializer(response, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return JsonResponse(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
