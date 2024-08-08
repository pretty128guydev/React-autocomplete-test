import React, { useState, ChangeEvent, useEffect } from 'react';
import { Place } from '../types/Place';

const MAPBOX_GEOCODING_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const MAPBOX_PUBLIC_ACCESS_TOKEN = 'pk.eyJ1IjoidGVybW94aW4iLCJhIjoiY2w0NjdhOHgxMDVtcTNjbjIwdWxjZHVsdCJ9.-RRQ9TZ9JdX8wkZfsOKq5g';

interface AutocompleteProps {
  onSelect: (place: Place) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onSelect }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      setLoading(true);
      const response = await fetch(
        `${MAPBOX_GEOCODING_API_URL}/${encodeURIComponent(value)}.json?access_token=${MAPBOX_PUBLIC_ACCESS_TOKEN}`
      );
      const data = await response.json();
      setSuggestions(data.features);
      setLoading(false);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place: Place) => {
    onSelect(place);
    setQuery(place.place_name);
    setSuggestions([]);
  };

  const highlightText = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type a place..."
        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
      />
      {loading && <div>Loading...</div>}
      {suggestions.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
          {suggestions.map((place) => (
            <li
              key={place.id}
              onClick={() => handleSelect(place)}
              style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
            >
              🌍 {highlightText(place.place_name, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
