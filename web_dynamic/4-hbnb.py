#!/usr/bin/python3
""" Starts a Flash Web Application """
import uuid

from flask import Flask, render_template

from models import storage
from models.amenity import Amenity
from models.place import Place
from models.state import State

app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    """Remove the current SQLAlchemy Session"""
    storage.close()


@app.route("/4-hbnb/", strict_slashes=False)
def hbnb():
    """HBNB is alive!"""
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template(
        "4-hbnb.html",
        states=st_ct,
        amenities=amenities,
        places=places,
        cache_id=uuid.uuid4(),
    )


if __name__ == "__main__":
    from os import environ

    HOST = environ.get("HBNB_MYSQL_HOST", "0.0.0.0")
    PORT = environ.get("HBNB_API_PORT", 5000)
    app.run(host=HOST, port=PORT)
