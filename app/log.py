class Logger:
    def init_app(self, app):
        self._app = app
        self.logger = self._app.logger
        # console = self.logger.StreamHandler()
        # console.setLevel(self.logger.INFO)
        # formatter = self.logger.Formatter(' % (asctime)s % (levelname)s % (message)s')
        # console.setFormatter(formatter)
        # self.logger.addHandler(console)

    def __init__(self, app=None):
        if app:
            self.init_app(app)

    def debug(self, msg):
        self.logger.debug(msg)

    def warning(self, msg):
        self.logger.warning(msg)

    def error(self, msg):
        self.logger.error(msg)