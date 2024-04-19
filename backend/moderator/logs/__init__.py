import logging

logger = logging.getLogger("moderator")

handler = logging.FileHandler('logs/moderator.log')
handler.setLevel(logging.DEBUG)

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

logger.addHandler(handler)