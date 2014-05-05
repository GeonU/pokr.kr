# -*- coding: utf-8 -*-

from sqlalchemy import Column, ForeignKey, Integer

from popong_models import Base


class FavoritePerson(Base):
    __tablename__ = 'favorite_person'

    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id', onupdate='CASCADE', ondelete='CASCADE'),
            nullable=False, index=True, unique='uix_favorite_person')
    person_id = Column(Integer, ForeignKey('person.id', onupdate='CASCADE', ondelete='CASCADE'),
            nullable=False, index=True, unique='uix_favorite_person')

