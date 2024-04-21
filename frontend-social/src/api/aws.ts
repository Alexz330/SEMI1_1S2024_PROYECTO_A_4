import { VITE_PORT_BACKEND, VITE_URL_BACKEND } from "../constants/api";




 const translateText = async (text: string) => {
    try {
      const response = await fetch(`${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/aws/text-translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.translations;
      } else {
        throw new Error('Failed to translate text');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      throw error;
    }
  };
  
   const convertTextToAudio = async (text: string) => {
    try {
      const response = await fetch(`${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/aws/contevert-text-audio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.audioBase64;
      } else {
        throw new Error('Failed to convert text to audio');
      }
    } catch (error) {
      console.error('Error converting text to audio:', error);
      throw error;
    }
  };
  
   const getImageLabels = async (photoUrl: string) => {
    try {
      const response = await fetch(`${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/aws/labels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: `https://practicassemi1.s3.amazonaws.com/Publicaciones/${photoUrl}.jpg`,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.labels;
      } else {
        throw new Error('Failed to get image labels');
      }
    } catch (error) {
      console.error('Error getting image labels:', error);
      throw error;
    }
  };

export {
    getImageLabels,
    convertTextToAudio,
    translateText
}
