import React, { useState } from 'react';
import Autocomplete from './components/Autocomplete';
import { Place } from './types/Place';

const App: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    console.log(selectedPlace)
  const handleSelect = (place: Place) => {
    setSelectedPlace(place);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Autocomplete with Mapbox</h2>
      <Autocomplete onSelect={handleSelect} />
      {selectedPlace && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Place</h3>
          <p><strong>🌍 {selectedPlace.place_name}</strong></p>
          <p><strong>Coordinates:</strong> {selectedPlace.geometry.coordinates.join(', ')}</p>
          
          {/* Display mapbox_id, wikidata, short_code, and other properties */}
          {selectedPlace.properties?.mapbox_id && (
            <p><strong>mapbox_id:</strong> {selectedPlace.properties.mapbox_id}</p>
          )}
          {selectedPlace.properties?.wikidata && (
            <p><strong>wikidata:</strong> {selectedPlace.properties.wikidata}</p>
          )}
          {selectedPlace.properties?.short_code && (
            <p><strong>short_code:</strong> {selectedPlace.properties.short_code}</p>
          )}

          {selectedPlace.context?.map((ctx) => (
            <p key={ctx.id}>
              <strong>{ctx.text}:</strong> {ctx.wikidata || ctx.short_code || ''}
            </p>
          ))}
          {selectedPlace.properties?.category && (
            <p><strong>Category:</strong> {selectedPlace.properties.category}</p>
          )}
          {selectedPlace.properties?.landmark && <p><strong>Landmark:</strong> ✅</p>}
          {selectedPlace.properties?.foursquare && (
            <p><strong>Foursquare:</strong> {selectedPlace.properties.foursquare}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
