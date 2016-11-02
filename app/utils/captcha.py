import random
import string
from PIL import Image,ImageDraw,ImageFont,ImageFilter
 
font_path = '../stitic/font/comic.ttf'
size = (100,30)
bgcolor = (230,230,230)


def generate_randStr(number=4):
    source = list(string.letters + string.digits)
    return ''.join(random.sample(source,number))


def rnd_color():
        return (random.randint(0, 200), random.randint(0, 200), random.randint(0, 200))


def generate_line(draw,width,height):
    begin = (random.randint(0, width), random.randint(0, height))
    end = (random.randint(0, width), random.randint(0, height))
    draw.line([begin, end], fill = rnd_color())


def generate_captcha(text):
    number = len(text)
    width,height = size
    image = Image.new('RGB',(width,height),bgcolor)
    font = ImageFont.truetype(font_path,25)
    draw = ImageDraw.Draw(image)
    font_width, font_height = font.getsize(text)
    draw.text(((width - font_width) / number, (height - font_height) / number),text,\
            font= font,fill=rnd_color())
    for i in range(20):
        generate_line(draw,width,height)
    return image

