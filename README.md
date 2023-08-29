# The Cozy Fox Den

Your retreat for relaxation and musical indulgence. Here, you're invited to snuggle up and find your comfort zone while enjoying the soothing sounds we offer. Dive into our collection of videos and let them whisk you away into a world of tranquility. And if you're inclined to share your own favorites, why not sign up and join our community? Embrace the cozy atmosphere and let the music take you to new levels of relaxation.

---

## Link to App
[The Cozy Fox Den](https://thecozyfoxden-a2209a5d8c7d.herokuapp.com/)

---

## Home Page 
![Homepage](public/Homepage.png)

---

## Category Selection
![Select a category](public/Browse.png)

---

## Logged in verification
![Welcome message](public/LoggedIn.png)

---

## Adding a video
![Share and relax](public/AddVideo.png)

---

## Enjoy relaxation
![Listen](public/Playvideo.png)

---

## Code Preview
```js
  const handleNotify = async (e) => {
    e.preventDefault();
    const extractedVideoId = getVideoIdFromUrl(videoUrl);

    try {
      const response = await sendRequest('/api/videos', 'POST', {
        videoUrl: extractedVideoId,
        category: selectedCategory,
      });
      if (response.title !== 'Untitled Video') {
        const newVideo = response;

        const selectedCategoryObject = categories.find(cat => cat.id === selectedCategory);

        const formattedVideo = {
          ...newVideo,
          customCategory: selectedCategoryObject ? selectedCategoryObject.name : '',
        };
        setVideoUrl('');
        setSelectedCategory('');
        toast.success('Success! Video has been added!', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark'
        })
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
      }
    } catch (error) {
      toast.error('An error occurred while adding the video', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark'
      })
    }
  };

```
---
## Technologies Used
Front End:
 ![React Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
 ![JavaScript Badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
 ![CSS Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
 ![Bootstrap Badge](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
 

Back End:
 ![Express Badge](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
 ![MongoDB Badge](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
 ![Node.js Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

Deployment:
 ![Heroku Badge](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

---
## Future Enhancements
   - [ ] Add a favorites list
   - [ ] Allow users to comment on the videos
   - [ ] Allow users to search the videos by name
   - [ ] Trello for more enhancements: [Trello](https://trello.com/b/qnQrYDDK/the-cozy-fox-den)
---