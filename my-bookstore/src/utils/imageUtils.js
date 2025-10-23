// Import all book images
import atomic from "../assets/atomic.jpg";
import alchemist from "../assets/alchemist.png";
import richdad from "../assets/richdadpoordad.png";
import habits from "../assets/7habits.png"; 
import thinkgrowrich from "../assets/think&growrich.png"; 
import subtleart from "../assets/thesubtle.png"; 
import powerofnow from "../assets/powerofnow.png"; 
import psychologyofmoney from "../assets/psychologyofmoney.png"; 
import deepwork from "../assets/deepwork.png"; 
import canthurtme from "../assets/canthurtme.png"; 
import club from "../assets/the5amclub.png"; 
import zerotoone from "../assets/zerotoone.png"; 
import crushingit from "../assets/crushingit.png"; 
import hooked from "../assets/hooked.png"; 
import thelean from "../assets/thelean.png";  
import fouragreements from "../assets/fouragreements.png";  
import educated from "../assets/educated.png";  
import sapiens from "../assets/sapiens.png";  
import ikigai from "../assets/ikigai.png";  
import startwithwhy from "../assets/startwithwhy.png";

// Create a mapping of image names to imported images
const imageMap = {
  "atomic.jpg": atomic,
  "alchemist.png": alchemist,
  "richdadpoordad.png": richdad,
  "7habits.png": habits,
  "think&growrich.png": thinkgrowrich,
  "thesubtle.png": subtleart,
  "powerofnow.png": powerofnow,
  "psychologyofmoney.png": psychologyofmoney,
  "deepwork.png": deepwork,
  "canthurtme.png": canthurtme,
  "the5amclub.png": club,
  "zerotoone.png": zerotoone,
  "crushingit.png": crushingit,
  "hooked.png": hooked,
  "thelean.png": thelean,
  "fouragreements.png": fouragreements,
  "educated.png": educated,
  "sapiens.png": sapiens,
  "ikigai.png": ikigai,
  "startwithwhy.png": startwithwhy
};

export const getImageSrc = (imageName) => {
  return imageMap[imageName] || '/placeholder-book.jpg';
};
