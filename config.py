class Config():
    SECRET_KEY='fuck'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:password@127.0.0.1/blog'
    IMG_SAVE_PATH = 'f:/asd/'
    GET_IMG_URL = '/images/'

    def __init__(self):
        pass
