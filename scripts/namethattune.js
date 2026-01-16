let artist = "";
let songTitle = "";
let albumUrl = "";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f6a9473b33msh70f1102c9583329p1904f8jsnea6265abacfa',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
}

window.addEventListener("load", function () {
    document.getElementById("artistSubmit").addEventListener("click", function () {
        artist = document.getElementById("userArtist").value;

        let formattedArtist = artist.replace(/\s+/g, "%20"); // Replaces all whitespaces with '%20'
        let url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${formattedArtist}&per_page=10&page=1`;

        fetch(url, options)
            .then(response => response.json())
            .then(data => {

                let artistReturn = data.hits.find(findArtist);
                if (!artistReturn) {
                    console.log("Artist not found");
                    document.getElementById("lyricsContainer").innerText = "Artist Not Found - Please Try Again";
                }
                else {
                    let lyricsContainer = document.getElementById("lyricsContainer");

                    // Swap over to song guessing elements
                    document.getElementById("artistPicker").style.display = "none";
                    document.getElementById("songGuesser").style.display = "block";
                    lyricsContainer.innerText = "";

                    let artistId = artistReturn.result.primary_artist.id;
                    let artistUrl = `https://genius-song-lyrics1.p.rapidapi.com/artist/songs/?id=${artistId}&per_page=10&page=1`;

                    fetch(artistUrl, options)
                        .then(artistResponse => artistResponse.json())
                        .then(artistData => {
                            let randomInt = Math.floor(Math.random() * 10)
                            console.log(artistData.songs[randomInt]);

                            let songId = artistData.songs[randomInt].id;
                            let songUrl = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songId}&text_format=plain`;

                            songTitle = artistData.songs[randomInt].title;
                            albumUrl = artistData.songs[randomInt].song_art_image_url;

                            let albumCover = document.getElementById("albumCover");
                            let titleDisplay = document.getElementById("songTitle");
                            let songArtist = document.getElementById("songArtist");

                            albumCover.src = albumUrl;
                            titleDisplay.innerText = songTitle;
                            songArtist.innerText = artist;

                            fetch(songUrl, options)
                                .then(songResponse => songResponse.json())
                                .then(songData => {
                                    let allLyrics = songData.lyrics.lyrics.body.plain.split('\n');

                                    let selectLyrics = "";

                                    for (let i = 0; i < 5; i++) {
                                        selectLyrics += allLyrics[i];
                                        selectLyrics += '\n';
                                    }

                                    lyricsContainer.innerText = selectLyrics;
                                })
                        })
                }
            })
    });


    document.getElementById("guessSubmit").addEventListener("click", function () {
        let userGuess = document.getElementById("userGuess").value;
        verifyGuess(userGuess);

        document.getElementById("songGuesser").style.display = "none";
        document.getElementById("resultScreen").style.display = "block";
    });

    document.getElementById("resetButton").addEventListener("click", function() {
        document.getElementById("userArtist").value = "";
        document.getElementById("userGuess").value = 

        document.getElementById("resultScreen").style.display = "none";
        document.getElementById("artistPicker").style.display = "block";
    });
});

function findArtist(apiData, IDX) {
    console.log(apiData.result.primary_artist.name);
    console.log(IDX);

    return apiData.result.primary_artist.name == artist;
}

function verifyGuess(guess) {
    let userResult = document.getElementById("userResult");

    if (guess.toLowerCase() == songTitle.toLowerCase()) {
        userResult.innerText = "Correct!";
    }
    else {
        userResult.innerText = "Incorrect";
    }
}