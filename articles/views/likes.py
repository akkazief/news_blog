from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.cache import never_cache


from articles.models import Article, Comment

@never_cache
@login_required
def article_like(request, pk):
    article = get_object_or_404(Article, pk=pk)

    if request.user in article.likes.all():
        article.likes.remove(request.user)
        liked = False
    else:
        article.likes.add(request.user)
        liked = True

    article.likes_count = article.likes.count()
    article.save(update_fields=['likes_count'])

    return JsonResponse({'count': article.likes_count, 'liked': liked})

@never_cache
@login_required
def comment_like(request, pk):
    comment = get_object_or_404(Comment, pk=pk)

    if request.user in comment.likes.all():
        comment.likes.remove(request.user)
        liked = False
    else:
        comment.likes.add(request.user)
        liked = True

    comment.likes_count = comment.likes.count()
    comment.save(update_fields=['likes_count'])

    return JsonResponse({'count': comment.likes_count, 'liked': liked})