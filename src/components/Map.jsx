import Image from "next/image";
import Map, { Marker } from "react-map-gl";
import { v4 } from "uuid";
import "mapbox-gl/dist/mapbox-gl.css";
import GreenMarker from "../../public/green_marker.svg";
import YellowMarker from "../../public/yellow_marker.svg";
import RedMarker from "../../public/red_marker.svg";
import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

export default function MapAndMarkers({ user, user_coord, facilities, setFacility }) {
  const map = useRef();
  const defaultImage = "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png";
  useEffect(() => {
    map.current?.flyTo({
      center: [user_coord.longitude, user_coord.latitude],
      duration: 1000,
    });
  }, [user_coord]);

  return (
    <Map
      ref={map}
      mapLib={import("mapbox-gl")}
      initialViewState={{
        longitude: user_coord.longitude,
        latitude: user_coord.latitude,
        zoom: 15,
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={user_coord.longitude} latitude={user_coord.latitude}>
        <img
          src={user ? user.photoURL : defaultImage}
          alt="user-avatar"
          width="30px"
          style={{ borderRadius: "100%" }}
        />
      </Marker>
      {facilities.map((i) => (
        <Marker longitude={i.longitude} latitude={i.latitude} key={v4()} onClick={() => setFacility(i.id)}>
          <Box _hover={{cursor : 'pointer'}}>
              {i.status === "suitable" ? (
                <Image src={GreenMarker} alt="green" />
              ) : i.status === "mod_suitable" ? (
                <Image src={YellowMarker} alt="yellow" />
              ) : (
                <Image src={RedMarker} alt="red" />
              )}
          </Box>
        </Marker>
      ))}
    </Map>
  );
}
