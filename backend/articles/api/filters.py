import django_filters
from django_filters import rest_framework as filters
from .models import Article, CulturalArea


class BaseInFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    pass


class ArticleFilter(filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr="icontains")
    content = django_filters.CharFilter(lookup_expr="icontains")
    tags = django_filters.CharFilter(field_name="tags__name", lookup_expr="icontains")
    category = django_filters.CharFilter(
        field_name="categories__name", lookup_expr="icontains"
    )
    village = django_filters.CharFilter(
        field_name="village__name", lookup_expr="icontains"
    )
    region = django_filters.CharFilter(
        field_name="village__region__name", lookup_expr="icontains"
    )
    cultural_area = django_filters.CharFilter(
        field_name="village__region__cultural_area__name", lookup_expr="icontains"
    )
    categories_list = BaseInFilter(field_name="categories__name", lookup_expr="in")
    villages_list = BaseInFilter(field_name="village__name", lookup_expr="in")
    regions_list = BaseInFilter(field_name="village__region__name", lookup_expr="in")
    cultural_areas_list = BaseInFilter(
        field_name="village__region__cultural_area__name", lookup_expr="in"
    )
    username = django_filters.CharFilter(
        field_name="author__username", lookup_expr="iexact"
    )
    is_published = django_filters.BooleanFilter()
    approved = django_filters.BooleanFilter()
    created_at = django_filters.DateTimeFromToRangeFilter()
    updated_at = django_filters.DateTimeFromToRangeFilter()

    class Meta:
        model = Article
        fields = [
            "title",
            "content",
            "tags",
            "category",
            "village",
            "categories_list",
            "villages_list",
            "regions_list",
            "cultural_areas_list",
            "username",
            "is_published",
            "approved",
            "created_at",
            "updated_at",
        ]


class CulturalAreaFilter(filters.FilterSet):

    name = django_filters.CharFilter(field_name="name", lookup_expr="icontains")
    description = django_filters.CharFilter(
        field_name="description", lookup_expr="icontains"
    )
