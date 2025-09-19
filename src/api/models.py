from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from werkzeug.security import generate_password_hash, check_password_hash
import os, datetime, jwt

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    

    def set_password(self, password: str):
        self.password = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password, password)

    def generate_token(self, expires_in=3600):
        payload = {
            "user_id": self.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)
        }
        secret = os.getenv("FLASK_APP_KEY", "super-secret-key")
        return jwt.encode(payload, secret, algorithm="HS256")



    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }