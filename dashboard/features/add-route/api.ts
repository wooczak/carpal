export async function fetchPlace(textQuery: string) {
  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        body: JSON.stringify({
          textQuery,
        }),
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": "AIzaSyAjTN9yO_RasLJe0FwcSKpExpYMnzE7oWE", // TODO: Change to process.env
            "X-Goog-FieldMask": "places.displayName,places.formattedAddress"
        }
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
