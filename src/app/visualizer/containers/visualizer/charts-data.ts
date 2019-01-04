export const chartsData = [
  {
    title: 'Acousticness',
    description:
      'Measures whether a track is acoustic, with 1 representing high acoustic characteristic.',
    chartData: [{ data: new Array(11).fill(0), label: 'All' }],
    chartColors: [
      {
        borderColor: '#F9B127',
        backgroundColor: 'transparent',
        pointBackgroundColor: '#F9B127',
        pointBorderColor: '#F9B127',
        pointHoverBackgroundColor: '#F9B127',
        pointHoverBorderColor: '#F9B127'
      }
    ]
  },
  {
    title: 'Danceability',
    description:
      'Describes how suitable a track is for dancing based on musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0 is least danceable and 1 is most danceable.',
    chartData: [{ data: new Array(11).fill(0), label: 'All' }],
    chartColors: [
      {
        borderColor: '#E82C4F',
        backgroundColor: 'transparent',
        pointBackgroundColor: '#E82C4F',
        pointBorderColor: '#E82C4F',
        pointHoverBackgroundColor: '#E82C4F',
        pointHoverBorderColor: '#E82C4F'
      }
    ]
  },
  {
    title: 'Energy',
    description:
      'Represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. Perceptual features include dynamic range, perceived loudness, timbre, onset rate, and general entropy.',
    chartData: [{ data: new Array(11).fill(0), label: 'All' }],
    chartColors: [
      {
        borderColor: '#62509C',
        backgroundColor: 'transparent',
        pointBackgroundColor: '#62509C',
        pointBorderColor: '#62509C',
        pointHoverBackgroundColor: '#62509C',
        pointHoverBorderColor: '#62509C'
      }
    ]
  },
  {
    title: 'Instrumentalness',
    description:
      'Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. The closer the instrumentalness value is to 1, the greater likelihood the track contains no vocal content.',
    chartData: [{ data: new Array(11).fill(0), label: 'All' }],
    chartColors: [
      {
        borderColor: '#EB6617',
        backgroundColor: 'transparent',
        pointBackgroundColor: '#EB6617',
        pointBorderColor: '#EB6617',
        pointHoverBackgroundColor: '#EB6617',
        pointHoverBorderColor: '#EB6617'
      }
    ]
  },
  {
    title: 'Liveness',
    description:
      'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live.',
    chartData: [{ data: new Array(11).fill(0), label: 'All' }],
    chartColors: [
      {
        borderColor: '#2884C7',
        backgroundColor: 'transparent',
        pointBackgroundColor: '#2884C7',
        pointBorderColor: '#2884C7',
        pointHoverBackgroundColor: '#2884C7',
        pointHoverBorderColor: '#2884C7'
      }
    ]
  },
  {
    title: 'Speechiness',
    description:
      'It detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1 the attribute value.',
    chartData: [{ data: new Array(11).fill(0), label: 'All' }],
    chartColors: [
      {
        borderColor: '#26A69A',
        backgroundColor: 'transparent',
        pointBackgroundColor: '#26A69A',
        pointBorderColor: '#26A69A',
        pointHoverBackgroundColor: '#26A69A',
        pointHoverBorderColor: '#26A69A'
      }
    ]
  },
  {
    title: 'Valence',
    description:
      'A measure from 0 to 1 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',
    chartData: [{ data: new Array(11).fill(0), label: 'All' }],
    chartColors: [
      {
        borderColor: '#66BB6A',
        backgroundColor: 'transparent',
        pointBackgroundColor: '#66BB6A',
        pointBorderColor: '#66BB6A',
        pointHoverBackgroundColor: '#66BB6A',
        pointHoverBorderColor: '#66BB6A'
      }
    ]
  }
]
