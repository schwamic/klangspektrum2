import {Features} from "@app/shared/models/features.model"

export interface Track {
  artists: string[],
  features: Features,
  disc_number: number,
  duration_ms: number,
  href: string,
  id: string,
  is_local: false,
  is_playable: true,
  name: string,
  popularity: number,
  preview_url: string,
  track_number: number,
  type: string,
  uri: string
}
