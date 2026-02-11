/* ===================== YOUTUBE VIDEOS DATA ===================== */
// Ye array of objects hai jisme har video ki puri information hai
const youtubeVideos = [
{
    id: 1,
    title:
      "How Bank Transactions Work | Learn Advanced Backend Project with Node.js Express & MongoDB",
    channel: "Sheryians Coding School",
    channelAvatar: "https://avatars.githubusercontent.com/u/69582226?v=4",
    views: "450K views",
    time: "4 hours ago",
    duration: "5:23:10",
    thumbnail: "https://i.ytimg.com/vi/NQOAQP0mow0/hqdefault.jpg",
    verified: true,
    category: "Web Development", // Backend project using Node, Express, MongoDB
  },
  {
    id: 2,
    title: "React JS Full Course for Beginners",
    channel: "Programming with Mosh",
    channelAvatar: "https://i.pravatar.cc/40?img=12",
    views: "1.2M views",
    time: "1 year ago",
    duration: "2:10:30",
    thumbnail: "https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg",
    verified: true,
    category: "React", // Pure React course
  },
  {
    id: 3,
    title: "HTML & CSS Complete Tutorial",
    channel: "SuperSimpleDev",
    channelAvatar: "https://i.pravatar.cc/40?img=32",
    views: "650K views",
    time: "6 months ago",
    duration: "3:45:20",
    thumbnail: "https://i.ytimg.com/vi/mU6anWqZJcc/hqdefault.jpg",
    verified: true,
    category: "HTML", // HTML & CSS basics
  },
  {
    id: 4,
    title: "JavaScript Crash Course",
    channel: "Traversy Media",
    channelAvatar: "https://i.pravatar.cc/40?img=14",
    views: "900K views",
    time: "8 months ago",
    duration: "1:02:45",
    thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/hqdefault.jpg",
    verified: true,
    category: "JavaScript", // JS fundamentals
  },
  {
    id: 5,
    title: "Tailwind CSS in One Video",
    channel: "Codevolution",
    channelAvatar: "https://i.pravatar.cc/40?img=22",
    views: "480K views",
    time: "4 months ago",
    duration: "55:10",
    thumbnail: "https://i.ytimg.com/vi/dFgzHOX84xQ/hqdefault.jpg",
    verified: false,
    category: "Tailwind CSS", // Tailwind focused video
  },
  {
    id: 6,
    title: "Machine Learning Basics for Beginners",
    channel: "freeCodeCamp.org",
    channelAvatar: "https://i.pravatar.cc/40?img=5",
    views: "2.3M views",
    time: "2 years ago",
    duration: "4:20:15",
    thumbnail: "https://i.ytimg.com/vi/GwIo3gDZCVQ/hqdefault.jpg",
    verified: true,
    category: "Machine Learning", // ML fundamentals
  },
  {
    id: 7,
    title: "Build Responsive Website with HTML CSS",
    channel: "Online Tutorials",
    channelAvatar: "https://i.pravatar.cc/40?img=44",
    views: "300K views",
    time: "3 months ago",
    duration: "1:30:00",
    thumbnail: "https://i.ytimg.com/vi/srvUrASNj0s/hqdefault.jpg",
    verified: false,
    category: "HTML", // Responsive layout using HTML & CSS
  },
  {
    id: 8,
    title: "JavaScript Array Methods in Depth",
    channel: "Akshay Saini",
    channelAvatar: "https://i.pravatar.cc/40?img=11",
    views: "860K views",
    time: "9 months ago",
    duration: "1:15:35",
    thumbnail: "https://i.ytimg.com/vi/R8rmfD9Y5-c/hqdefault.jpg",
    verified: true,
    category: "JavaScript", // Advanced JS topic
  },
  {
    id: 9,
    title: "Flexbox & Grid Crash Course",
    channel: "Kevin Powell",
    channelAvatar: "https://i.pravatar.cc/40?img=28",
    views: "540K views",
    time: "7 months ago",
    duration: "48:25",
    thumbnail: "https://i.ytimg.com/vi/JJSoEo8JSnc/hqdefault.jpg",
    verified: true,
    category: "HTML", // CSS layout system
  },
  {
    id: 10,
    title: "Node JS REST API Tutorial",
    channel: "The Net Ninja",
    channelAvatar: "https://i.pravatar.cc/40?img=8",
    views: "390K views",
    time: "10 months ago",
    duration: "1:40:10",
    thumbnail: "https://i.ytimg.com/vi/l8WPWK9mS5M/hqdefault.jpg",
    verified: false,
    category: "Web Development", // Backend API with Node
  },
];

/* ===================== DOM ELEMENTS SELECT ===================== */
// Jaha videos render honge
const videosContainer = document.getElementById("videos");

// Search input box
const searchInput = document.getElementById("searchInput");


/* ===================== TEXT HIGHLIGHT FUNCTION ===================== */
// Ye function search word ko title/channel me highlight karta hai
function highlightText(text, search) {
  if (!search) return text; // agar kuch search nahi to normal text return

  // Regex banake search word ko dhunda
  const regex = new RegExp(`(${search})`, "gi");

  // Matched word ko <span> me wrap karke highlight kiya
  return text.replace(regex, `<span class="highlight">$1</span>`);
}


/* ===================== SEARCH BY TYPING ===================== */
// Jab user input box me type kare
searchInput.addEventListener("input", function () {
  const text = this.value.toLowerCase(); // user ka typed text

  // Title ya channel me match ho to filter karo
  const filtered = youtubeVideos.filter((video) =>
    video.title.toLowerCase().includes(text) ||
    video.channel.toLowerCase().includes(text)
  );

  // Agar videos mile to render karo, warna message dikhao
  if (filtered.length > 0) {
    renderVideos(filtered, text);
  } else {
    videosContainer.innerHTML =
      '<h2 style="text-align:center;margin-top:40px;">Data not found</h2>';
  }
});

/* ===================== VOICE SEARCH (MIC) ===================== */

// Mic icon select
const micBtn = document.querySelector(".mic");

// Speech recognition support check
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";
  recognition.continuous = false;

  // Mic click → voice listening start
  micBtn.addEventListener("click", () => {
    recognition.start();
  });

  // Voice se text milte hi
  recognition.onresult = function (event) {
    const voiceText = event.results[0][0].transcript;

    // Input box me text set karo
    searchInput.value = voiceText;

    // Existing search event ko trigger karo
    searchInput.dispatchEvent(new Event("input"));
  };

  recognition.onerror = function () {
    alert("Voice search error. Mic allow karo.");
  };
}

/* ===================== CLEAR INPUT ===================== */
const clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", function () {
  // input box clear
  searchInput.value = "";

  // saare videos wapas dikhao
  renderVideos(youtubeVideos);

  // All chip ko active karo (optional but correct UX)
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  document.querySelector('[data-category="All"]').classList.add("active");
});


/* ===================== CATEGORY FILTER (CHIPS BUTTONS) ===================== */

// Sab category buttons select
const chips = document.querySelectorAll(".chip");

chips.forEach((chip) => {
  chip.addEventListener("click", function () {
    // Active class update
    chips.forEach((c) => c.classList.remove("active"));
    this.classList.add("active");

    const selectedCategory = this.dataset.category;

    // Agar "All" hai to sab videos dikhao
    if (selectedCategory === "All") {
      renderVideos(youtubeVideos);
      return;
    }

    // Category match hone wale videos filter karo
    const filteredVideos = youtubeVideos.filter(
      (video) => video.category === selectedCategory
    );

    renderVideos(filteredVideos);
  });
});


/* ===================== VIDEO RENDER FUNCTION ===================== */
// Ye function videos ko HTML me convert karke page par dikhata hai
function renderVideos(data, searchText = "") {
  videosContainer.innerHTML = ""; // container clear

  data.forEach((video) => {
    videosContainer.innerHTML += `
      <div class="video-card">

        <div class="thumb-wrap">
          <img src="${video.thumbnail}" class="thumbnail"/>
          <span class="duration">${video.duration}</span>
        </div>

        <div class="video-info">
          <img src="${video.channelAvatar}" class="channel-avatar"/>

          <div class="video-text">
            <h4>
              ${highlightText(video.title, searchText)}
              ${
                video.verified
                  ? '<i class="fa-solid fa-circle-check" style="color:#606060;font-size:12px;"></i>'
                  : ""
              }
            </h4>

            <p>${highlightText(video.channel, searchText)}</p>
            <p>${video.views} • ${video.time}</p>
          </div>
        </div>

      </div>
    `;
  });
}


/* ===================== INITIAL LOAD ===================== */
// Page load hote hi sab videos show karo
renderVideos(youtubeVideos);

