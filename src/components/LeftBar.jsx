import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  doc,
  deleteDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import app from "../firebase";

const LeftBar = (props) => {
  const {
    markers,
    activeMarker,
    infoWindowContent,
    hideLeftbar,
    handleReloadMarker,
  } = props;
  const [selectedMarker, setSelectedMarker] = useState(activeMarker);
  const [selectedMarkerInfo, setSelectedMarkerInfo] =
    useState(infoWindowContent);
  const [filteredMarkers, setFilteredmarkers] = useState(markers);

  var db = getFirestore(app);

  useEffect(() => {
    setSelectedMarker(activeMarker);
    setSelectedMarkerInfo(infoWindowContent);
    setFilteredmarkers(markers);
  }, [activeMarker, infoWindowContent]);

  useEffect(() => {
    setFilteredmarkers(markers);
    setSelectedMarker(null);
    setSelectedMarkerInfo(null);
  }, [markers]);

  //Remove the selected marker from markers list
  useEffect(() => {
    var remainings = markers.filter(
      (marker) => marker.label !== selectedMarker?.label
    );
    setFilteredmarkers(remainings);
  }, [selectedMarker]);

  const handleSingleClick = async (marker) => {
    console.log(
      "🚀 ~ file: LeftBar.jsx:50 ~ handleSingleClick ~ marker:",
      marker
    );
    const lat = marker.position.lat;
    const lng = marker.position.lng;
    setSelectedMarker(marker);
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
        import.meta.env.VITE_GOOGLE_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          setSelectedMarkerInfo(address);
        }
      })
      .catch((error) => {
        console.error("Error in reverse geocoding:", error);
      });
  };

  const deleteMarker = async (marker) => {
    if (
      window.confirm(
        "Are you sure you wish to delete this item?\nThis action can't be undo"
      )
    ) {
      await deleteDoc(doc(db, "Quests", `Quest ${marker.label}`));
      handleReloadMarker();
    }
  };

  return (
    <div className="h-full">
      <div className=" flex justify-between p-4 border-b-2 border-b-gray-600 ">
        <strong>Quest_0001</strong>
        <button
          onClick={hideLeftbar}
          className=" px-2 py-1 text-center rounded-full bg-slate-300 text-gray-700 hover:bg-slate-400 hover:text-gray-800 transition ease-in-out duration-300"
        >
          Hide
        </button>
      </div>
      {selectedMarker && (
        <div className="flex justify-between items-center p-4">
          <strong>Quest {selectedMarker?.label}</strong>
          <button
            onClick={() => deleteMarker(selectedMarker)}
            className=" text-center rounded-full bg-slate-300 text-gray-700 w-8 h-8 hover:bg-slate-400  hover:text-gray-800 transition ease-in-out duration-300"
          >
            X
          </button>
        </div>
      )}
      {selectedMarkerInfo && selectedMarker && (
        <div className="p-4 shadow bg-slate-300 rounded-lg mx-4">
          <p>{selectedMarkerInfo}</p>
        </div>
      )}
      {/* Showing the lists of marks except seleted one */}
      <div className="flex flex-col gap-4 mt-4 h-3/5 overflow-auto">
        {filteredMarkers.map((marker, index) => {
          return (
            <div key={index} className="flex justify-between items-center px-4">
              <strong
                onClick={() => handleSingleClick(marker)}
                className="cursor-pointer hover:underline"
              >
                Quest {marker.label}
              </strong>
              <button
                onClick={() => deleteMarker(marker)}
                className=" text-center rounded-full bg-slate-300 text-gray-700 w-8 h-8 hover:bg-slate-400  hover:text-gray-800 transition ease-in-out duration-300"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftBar;
