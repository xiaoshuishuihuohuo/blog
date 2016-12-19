class Config():
    SECRET_KEY='fuck'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://mysql:123@192.168.1.5/blog'
    #SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:password@127.0.0.1/blog'
    UPLOAD_BASE_PATH = 'f:/asd/'
    IMG_SAVE_PATH = UPLOAD_BASE_PATH + 'image/'
    AVATAR_SAVE_PATH = UPLOAD_BASE_PATH + 'avatar/'
    MAX_CONTENT_LENGTH = 16*1024*1024
    ALLOWED_EXTENSIONS = ('jpg','jpeg','png')

    def __init__(self):
        pass
