export interface Place {
    id: string;
    place_name: string;
    geometry: {
      coordinates: [number, number];
    };
    context?: Array<{
      id: string;
      text: string;
      wikidata?: string;
      short_code?: string;
    }>;
    properties?: {
      landmark?: boolean;
      foursquare?: string;
      category?: string;
      wikidata?: string;
      mapbox_id?: string;
      short_code?: string;
    };
  }
  