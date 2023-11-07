import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { getFirestore, collection, doc, setDoc, getDocs, orderBy, query } from "firebase/firestore";
import app from "../firebase";

function QuestMap(props) {
  const [markers, setMarkers] = useState([]);
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
  return (
    <div>
      <Map
        google={props.google}
        zoom={12}
        onClick={handleMapClick}
        initialCenter={{ lat: 33.7077, lng: 73.0498 }}
      >
        {markers.map((marker, index) => (
          <Marker key={index} {...marker} />
        ))}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_GOOGLE_KEY,
})(QuestMap);
