#coding=utf-8
import bleach


class WhiteList(object):
    'allow tags and attrs'
    tags = [
        'html', 'head', 'body', 'h1', 'b', 'i', 'u', 'strike',
        'ol', 'li', 'ul', 'blockquote', 'p', 'pre', 'code', 'br',
        'table', 'colgroup', 'col', 'thead', 'tr', 'th', 'tbody',
        'td', 'a', 'img', 'hr', 'span'
    ]

    attrs = [
        'style', 'class', 'width', 'height', 'href', 'target', 'alt', 'src'
    ]


def xss_clean(text):
    'clean text'
    return bleach.clean(text, tags=WhiteList.tags, attributes=WhiteList.attrs)
