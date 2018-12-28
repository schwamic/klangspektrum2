// Default chart data
export const chartsData = [
  {
    title: 'Acousticness',
    description:
      'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.',
    chartData: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'All' }],
    chartColors: [
      {
        backgroundColor: '#F9B127'
      }
    ]
  },
  {
    title: 'Danceability',
    description:
      'It describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.',
    chartData: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'All' }],
    chartColors: [
      {
        backgroundColor: '#E82C4F'
      }
    ]
  },
  {
    title: 'Energy',
    description:
      'It is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.',
    chartData: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'All' }],
    chartColors: [
      {
        backgroundColor: '#62509C'
      }
    ]
  },
  {
    title: 'Instrumentalness',
    description:
      'Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.',
    chartData: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'All' }],
    chartColors: [
      {
        backgroundColor: '#EB6617'
      }
    ]
  },
  {
    title: 'Liveness',
    description:
      'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.',
    chartData: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'All' }],
    chartColors: [
      {
        backgroundColor: '#2884C7'
      }
    ]
  },
  {
    title: 'Speechiness',
    description:
      'It detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks. ',
    chartData: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'All' }],
    chartColors: [
      {
        backgroundColor: '#26A69A'
      }
    ]
  },
  {
    title: 'Valence',
    description:
      'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',
    chartData: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'All' }],
    chartColors: [
      {
        backgroundColor: '#66BB6A'
      }
    ]
  }
]
