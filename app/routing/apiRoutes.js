// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================

const router = require('express').Router();

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'b14ecee172mshc39d6050dcc74afp1f7555jsna5b5a33998aa',
//         'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
//         'Accept': 'application/json'
//     }
// }

const axios = require('axios');



// Routes
// =============================================================

// used for dumping the friends in json format to the browser
router.get("/geniusArtist", async (req, res) => {
    console.log(req.query.artist);

    const options = {
        method: 'GET',
        url: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
        params: {
            q: `${req.query.artist}`,
            per_page: '10',
            page: '1'
        },
        headers: {
            'X-RapidAPI-Key': 'b14ecee172mshc39d6050dcc74afp1f7555jsna5b5a33998aa',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return res.json(response.data)
    } catch (error) {
        console.error(error);
    }

//     fetch(url, options)
//         .then(response => {
//             console.log(response.data)
//             return res.json(response)
//         })
//         .catch(x => res.json(x))
});

router.get("/geniusArtistSongs/:id", async (req, res) => {
    console.log(req.params.id);
    let url = `https://genius-song-lyrics1.p.rapidapi.com/artist/songs/?id=${req.params.id}&per_page=10&page=1`;

    const options = {
        method: 'GET',
        url: 'https://genius-song-lyrics1.p.rapidapi.com/artist/songs/',
        params: {
            id: `${req.params.id}`,
            per_page: '10',
            page: '1'
        },
        headers: {
            'X-RapidAPI-Key': 'b14ecee172mshc39d6050dcc74afp1f7555jsna5b5a33998aa',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return res.json(response.data)
    } catch (error) {
        console.error(error);
    }

    // fetch(url, options)
    //     .then(response => res.json(response))
});

router.get("/geniusSongLyrics/:songId", async (req, res) => {
    console.log(req.params.songId);
    let url = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${req.params.songId}&text_format=plain`;

    const options = {
        method: 'GET',
        url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
        params: {
            id: `${req.params.songId}`,
            text_format: 'plain'
        },
        headers: {
            'X-RapidAPI-Key': 'b14ecee172mshc39d6050dcc74afp1f7555jsna5b5a33998aa',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return res.json(response.data)
    } catch (error) {
        console.error(error);
    }

    // fetch(url, options)
    //     .then(response => res.json(response))
});

// Create New Characters - takes in JSON input
router.post("/api/friends", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newFriend = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();
    console.log(newFriend);

    var diffArray = [];
    console.log("friendsArray.length: " + friendsArray.length);


    for (i = 0; i < friendsArray.length; i++) {
        var diff = 0
        console.log("friend array scores " + friendsArray[i].scores.length);
        for (j = 0; j < friendsArray[i].scores.length; j++) {
            diff += Math.abs(friendsArray[i].scores[j] - newFriend.scores[j]);
        }
        diffArray.push(diff)
        console.log(diffArray);
    }

    // find the min value of the scores array - lowest value means the best match
    // if there is a tie it will pick the first person
    console.log(Math.min(...diffArray));

    var maxIndex = diffArray.indexOf(Math.min(...diffArray));
    console.log(maxIndex);

    console.log(" your best match is " + JSON.stringify(friendsArray[maxIndex]));

    friendsArray.push(newFriend);

    res.json(friendsArray[maxIndex]);
});

module.exports = router
