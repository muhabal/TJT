from django import template

register = template.Library()

@register.filter
def percentage(value, arg):
  try:
    return int(value*arg)
  except (ValueError, TypeError):
    return ''

@register.filter
def invoice_no(value):
  try:
    return(value[0:13])
  except (ValueError, TypeError):
    return ''
