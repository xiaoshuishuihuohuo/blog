class Config():
    SECRET_KEY='fuck'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://mysql:123@192.168.1.5/blog'
    IMG_SAVE_PATH = 'f:/asd/'

    def __init__(self):
        pass
