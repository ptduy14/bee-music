const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sliderBox = $('.slider-box');
const sliderItem = $$('.slider-box-item');
const btnSliderNext = $('.btn-next');
const btnSliderPrev = $('.btn-prev');

const navItems = $$('.navbar-item');

const listSong = $('.list-song');
const nameSongBox = $('.name-song h3');
const audio = $('#audio');
const togglePlay = $('.btn-toggle-play');
const controllPlayer = $('.controll-player');
const progressAudio = $('#progress');
const btnNextSong = $('.btn-next-song');
const btnPrevSong = $('.btn-prev-song');
const btnRepeatSong = $('.btn-repeat');
const btnMixSong = $('.btn-mix');
const volumnControll = $('#volumn-input');
const btnCloseControllFixed = $('.close-fixed');
const cdImg = $('.cd-img');
const progressBar = $('.progress-bar');
const volumnInputBar = $('.volumn-input-bar');
const closeSidebar = $('.close-sidebar');
const sidebar = $('.sidebar');
const openSidebar = $('.open-sidebar');

const valueVolumn = $('.value-volumn');
const valueVolumnSpan = $('.value-volumn span');

// vị trí mặc định của slide item
var currentPosition = sliderItem[0].clientWidth;
window.onresize = function () {
    currentPosition = sliderItem[0].clientWidth;
}

app = {
    songs: [
        {
            name: 'Hotel California',
            artist: 'Eagles',
            time: '6:29',
            album: 'singles',
            img: './assets/img/img-song1.jpg',
            path: './assets/songs/song-1.mp3'
        },
        {
            name: 'HARU HARU(하루하루) ',
            artist: 'BIGBANG',
            time: '5:24',
            album: '3RD MINI ALBUM',
            img: './assets/img/img-song2.jpg',
            path: './assets/songs/song-2.mp3'
        },
        {
            name: 'FACE(페이스)',
            artist: 'NUEST(뉴이스트)',
            time: '3:43',
            album: 'singles',
            img: './assets/img/img-song3.jpg',
            path: './assets/songs/song-3.mp3'
        },
        {
            name: 'LAST DANCE',
            artist: 'BIGBANG',
            time: '4:56',
            album: 'Made Series',
            img: './assets/img/img-song4.jpg',
            path: './assets/songs/song-4.mp3'
        },
        {
            name: 'LOSER',
            artist: 'BIGBANG',
            time: '3:46',
            album: 'Made Series',
            img: './assets/img/img-song5.jpg',
            path: './assets/songs/song-5.mp3'
        },
        {
            name: 'Sugar',
            artist: 'Maroon 5',
            time: '3:52',
            album: 'singles',
            img: './assets/img/img-song6.jpg',
            path: './assets/songs/song-6.mp3'
        },
        {
            name: ' Locked Away',
            artist: 'R. City ft. Adam Levine',
            time: '4:25',
            album: 'Single Song',
            img: './assets/img/img-song7.jpg',
            path: './assets/songs/song-7.mp3'
        },
        {
            name: 'Adventure Of A Lifetime',
            artist: 'Coldplay',
            time: '4:28',
            album: 'A Head Full of Dreams',
            img: './assets/img/img-song8.jpg',
            path: './assets/songs/song-8.mp3'
        },
        {
            name: 'The Days',
            artist: 'Avicii',
            time: '4:33',
            album: 'TERRACE HOUSE TUNES - CLOSING DOOR',
            img: './assets/img/img-song9.jpg',
            path: './assets/songs/song-9.mp3'
        },
        {
            name: 'Waiting For Love',
            artist: 'Avicii',
            time: '3:51',
            album: 'Hot Summer Hits 2015',
            img: './assets/img/img-song10.jpg',
            path: './assets/songs/song-10.mp3'
        }
    ],
    counter: 0,
    currentIndex: 0,
    isRepeat: false,
    isMixSong: false,
    isPlaying: false,
    isCloseControll: false,
    render: function () {
        var htmls = app.songs.map(function (song, index) {
            return `<li class="song-item hover" data-index="${index}">
                        <div class="serial">${index + 1}</div>
                        <div class="title">${song.name}</div>
                        <div class="artist">${song.artist}</div>
                        <div class="time">${song.time}</div>
                        <div class="album">${song.album}</div>
                    </li>`
        });
        listSong.innerHTML = htmls.join(' ');

    },

    // hàm lắng nghe các DOM event
    eventDoms: function () {

        app.handleSlideItem();
        // event click on slider
        btnSliderNext.onclick = function () {
            if (app.counter == sliderItem.length - 1) {
                app.counter = 0;
            } else {
                app.counter++;
            }
            app.handleSlideItem();
        }

        btnSliderPrev.onclick = function () {
            if (app.counter <= 0) {
                app.counter = sliderItem.length - 1;
            } else {
                app.counter--;
            }
            app.handleSlideItem();
        }
        // tự động chuyển slide

        setInterval(function () {
            if (app.counter == sliderItem.length - 1) {
                app.counter = 0;
            } else {
                app.counter++;
            }
            app.handleSlideItem()
        }, 10000);

        btnCloseControllFixed.onclick = function () {
            app.isCloseControll = !app.isCloseControll
            controllPlayer.classList.remove('fixed');
        }

        closeSidebar.onclick = function () {
            sidebar.classList.remove('active');
        }

        openSidebar.onclick = function () {
            sidebar.classList.add('active');
        }
        // ==== end event click on slider =====

        // event click on sidebar nav
        navItems.forEach(function (navItem) {
            navItem.onclick = function (e) {
                e.preventDefault();
                
                app.handleActiveNavItem(navItem);
            }
        });
        // envent audio

        var cdAnimate = cdImg.animate([
            { transform: 'rotate(360deg)' }
        ],
        {
            duration: 7000,
            iterations: Infinity
        })

        cdAnimate.pause();

        togglePlay.onclick = function () {
            if (app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        audio.onplay = function () {
            app.isPlaying = true;
            controllPlayer.classList.add('active');
            cdAnimate.play();
        }

        audio.onpause = function () {
            app.isPlaying = false;
            controllPlayer.classList.remove('active');
            cdAnimate.pause();
        }

        audio.ontimeupdate = function () {
            if (audio.duration) {
                var currentProgress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = currentProgress.toFixed(2) + '%';
                progressAudio.value = currentProgress.toFixed(2)
            }
        }

        progressAudio.oninput = function () {
            var timeChange = progressAudio.value;
            audio.currentTime = (audio.duration / 100) * timeChange;
        }

        // next bài hát
        btnNextSong.onclick = function () {
            app.nextSong();
            app.activeSong();
            app.scrollToView()
            audio.play();
        }
        // prev bài hát
        btnPrevSong.onclick = function () {
            app.prevSong();
            app.activeSong();
            audio.play();
            app.scrollToView()
        }

        // repeat bài hát
        btnRepeatSong.onclick = function () {
            app.isRepeat = !app.isRepeat;
            btnRepeatSong.classList.toggle('active');
            app.isMixSong = false;
            btnMixSong.classList.remove('active');
        }

        // trộn bài hát
        btnMixSong.onclick = function () {
            app.isMixSong = !app.isMixSong;
            btnMixSong.classList.toggle('active');
            app.repeatSong = false;
            btnRepeatSong.classList.remove('active');
        }

        // sự kiện end audio
        audio.onended = function () {
            if (app.isRepeat) {
                app.repeatSong();
            } else if (app.isMixSong) {
                app.mixSong();
            } else {
                app.nextSong();
            }
            audio.play();
            app.activeSong();
            app.scrollToView()
        }

        // click ngẫu nhiên bài hát
        listSong.onclick = function (e) {
            var songItem = e.target.closest('.song-item');
            if (songItem) {
                app.currentIndex = songItem.dataset.index;
                app.loadCurrentSong();
                app.activeSong();
                audio.play();
            }
        }

        // điều chỉnh âm lượng
        volumnControll.oninput = function () {
            var volumnValue = volumnControll.value / 100;
            audio.volume = volumnValue;

            valueVolumnSpan.textContent = volumnControll.value + '%';
            volumnInputBar.style.width = volumnControll.value + '%';
            valueVolumn.classList.add('active');

        }
        
        volumnControll.onblur = function () {
                valueVolumn.classList.remove('active');
        }
        
    },

    // hàm xử lí trượt slide item
    handleSlideItem: function () {
        sliderBox.style.transform = 'translateX(' + (-currentPosition * app.counter) + 'px)';
    },
    handleFixedControllPlayer: function () {
        window.onscroll = function () {
            if (window.pageYOffset < 325) {
                if (app.isCloseControll) {
                    return;
                } else {
                    controllPlayer.classList.add('fixed');
                }
            } else {
                app.isCloseControll = false;
                controllPlayer.classList.remove('fixed');
            }
        }
    },
    // hàm xử lí active cho navitem
    handleActiveNavItem: function (navItem) {
        $('.navbar-item.active').classList.add('hover-nav');
        $('.navbar-item.active').classList.remove('active');

        navItem.classList.add('active');
        navItem.classList.remove('hover-nav');
    },

    getCurrentSong: function () {
        return app.songs[app.currentIndex];
    },
    // hoàm load bài hát hiện tại
    loadCurrentSong: function () {
        nameSongBox.innerText = app.getCurrentSong().name;
        audio.src = app.getCurrentSong().path;
        cdImg.style.backgroundImage = `url('${app.getCurrentSong().img}')`;
    },
    // next bài hát
    nextSong: function () {
        app.currentIndex++;
        if (app.currentIndex > app.songs.length - 1) {
            app.currentIndex = 0;
        }
        app.loadCurrentSong();
    },
    // pre bài hát
    prevSong: function () {
        app.currentIndex--;
        if (app.currentIndex < 0) {
            app.currentIndex = app.songs.length - 1;
        }
        app.loadCurrentSong();
    },
    // repeat bài hát
    repeatSong: function () {
        app.loadCurrentSong();
    },
    // mix bài hát
    mixSong: function () {
        var newCurrentIndex;
        do {
            newCurrentIndex = Math.floor(Math.random() * app.songs.length);
        } while (newCurrentIndex == app.currentIndex);
        
        app.currentIndex = newCurrentIndex;
        app.loadCurrentSong();
    },
    // active song
    activeSong: function () {
        if ($('.song-item.active')) {
            $('.song-item.active').classList.add('hover');
            $('.song-item.active').classList.remove('active');
        }
       $$('.song-item')[app.currentIndex].classList.add('active');
       $$('.song-item')[app.currentIndex].classList.remove('hover');
    },
    defaulVolume: function () {
        audio.volume = 1;
        volumnControll.value = 1 * 100;
        volumnInputBar.style.width = volumnControll.value + '%';
    },
     scrollToView: function () {
         setTimeout(function () {
            $('.song-item.active').scrollIntoView({
                behavior: "smooth", 
                block: "center"
            });
         }, 5000);
     },
    // hàm main khởi động
    start: function () {
        app.eventDoms();
        app.render();
        app.loadCurrentSong();
        app.activeSong();
        app.defaulVolume();
        app.handleFixedControllPlayer();
    }
}

app.start();