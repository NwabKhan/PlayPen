import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import app from "../firebase";

function QuestMap(props) {
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [infoWindowContent, setInfoWindowContent] = useState("");

  var db = getFirestore(app);

  //Show the mark and save it in firestor
  const handleMapClick = async (mapProps, map, event) => {
    const newMarker = {
      position: event.latLng,
      label: String(markers.length + 1), // Numbered marker
    };

    // Add the new marker to the state
    setMarkers([...markers, newMarker]);

    // Saving marker data to Firebase as you described
    const questNumber = String(markers.length + 1);
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const parentQuestDocRef = null;
    const questsCollection = collection(db, "Quests");

    // Reference the parent quest document if provided
    const parentQuestRef = parentQuestDocRef
      ? parentQuestDocRef
      : questsCollection;

    const customQuestId = `Quest ${questNumber}`;
    const currentQuestDocRef = doc(parentQuestRef, customQuestId);
    // Add the current quest's data
    await setDoc(currentQuestDocRef, {
      location: { lat, lng },
      timestamp: new Date(),
      questNumber,
    });
  };

  // Function to fetch existing markers from Firestore
  const fetchExistingMarkers = async () => {
    const questsCollection = collection(db, "Quests");

    try {
      const querySnapshot = await getDocs(
        query(questsCollection, orderBy("questNumber"))
      );

      const existingMarkers = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.location && data.questNumber) {
          existingMarkers.push({
            position: { lat: data.location.lat, lng: data.location.lng },
            label: String(data.questNumber),
          });
        }
      });

      setMarkers(existingMarkers);
    } catch (error) {
      console.error("Error fetching existing markers:", error);
    }
  };

  useEffect(() => {
    // Fetch existing markers when the component mounts
    fetchExistingMarkers();
  }, []);

  const markerClickHandler = async (marker, index) => {
    const lat = marker.position.lat;
    const lng = marker.position.lng;
    setActiveMarker(marker);
    setShowInfoWindow(true)
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
        import.meta.env.VITE_GOOGLE_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          setInfoWindowContent(address);
          setShowInfoWindow(true);
        }
      })
      .catch((error) => {
        console.error("Error in reverse geocoding:", error);
        setShowInfoWindow(false);
      });
  };

  return (
    <div>
      <Map
        google={props.google}
        zoom={12}
        onClick={handleMapClick}
        initialCenter={{ lat: 33.7077, lng: 73.0498 }}
      >
        {markers.map((marker, index) => (
          <Marker
            onClick={() => markerClickHandler(marker, index)}
            key={index}
            // title={marker.name}
            {...marker}
          />
        ))}
        {
          console.log("checking: ", activeMarker, infoWindowContent, showInfoWindow)
        }
        {showInfoWindow ? (
          <InfoWindow
            position={{
              lat: activeMarker.position.lat,
              lng: activeMarker.position.lng,
            }}
            marker={activeMarker}
            visible={showInfoWindow}
          >
            <div className="p-4 bg-slate-200 rounded">
              <p
                style={{ maxWidth: "8rem" }}
                className="text-gray-800 truncate overflow-hidden"
              >
                {infoWindowContent}
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_GOOGLE_KEY,
})(QuestMap);
