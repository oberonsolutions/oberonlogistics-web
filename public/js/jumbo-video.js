// Hero video cycling with dissolve transition
(function() {
  const video = document.querySelector('.jumbotron-video');
  if (!video) return;

  const videos = JSON.parse(video.dataset.videos || '[]');
  if (videos.length < 2) return;

  let currentIndex = 0;
  let cycleTimer = null;
  const source = video.querySelector('source');

  // Create two video elements
  const video1 = video;
  video1.style.transition = 'opacity 1s ease-in-out';

  const video2 = video.cloneNode(true);
  video2.classList.remove('jumbotron-video');
  video2.classList.add('jumbotron-video-2');
  video2.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:100%;min-height:100%;width:auto;height:auto;object-fit:cover;z-index:0;opacity:0;transition:opacity 1s ease-in-out';
  video1.parentNode.insertBefore(video2, video1);

  let activeVideo = video1;
  let inactiveVideo = video2;

  function transitionToNext() {
    const nextIndex = (currentIndex + 1) % videos.length;

    // Preload next video in inactive element
    const inactiveSource = inactiveVideo.querySelector('source');
    inactiveSource.src = videos[nextIndex];
    inactiveVideo.load();
    inactiveVideo.play().catch(function() {});

    // Crossfade
    activeVideo.style.opacity = '0';
    inactiveVideo.style.opacity = '1';

    // After crossfade, swap elements
    setTimeout(function() {
      // Swap references
      const temp = activeVideo;
      activeVideo = inactiveVideo;
      inactiveVideo = temp;

      currentIndex = nextIndex;
      startTimer();
    }, 1000);
  }

  function startTimer() {
    if (cycleTimer) clearTimeout(cycleTimer);
    cycleTimer = setTimeout(transitionToNext, 7000);
  }

  startTimer();
})();