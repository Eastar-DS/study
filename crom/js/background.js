const images = ["https://p4.wallpaperbetter.com/wallpaper/459/393/313/robin-huang-kiki-hsieh-hd-wallpaper-preview.jpg",
"https://p4.wallpaperbetter.com/wallpaper/528/298/475/winter-water-snow-trees-landscape-hd-wallpaper-preview.jpg",
"https://p4.wallpaperbetter.com/wallpaper/103/931/600/landscape-clouds-nature-hd-wallpaper-preview.jpg",
"https://p4.wallpaperbetter.com/wallpaper/536/115/799/messier-16-eagle-nebula-m16-star-queen-nebula-space-hd-wallpaper-preview.jpg",
"https://p4.wallpaperbetter.com/wallpaper/333/269/304/artwork-fantasy-art-fantasy-girl-artstation-women-hd-wallpaper-preview.jpg",
"https://p4.wallpaperbetter.com/wallpaper/246/179/660/nature-landscape-sunset-mountains-hd-wallpaper-preview.jpg",
"https://p4.wallpaperbetter.com/wallpaper/478/658/566/outdoors-bench-sea-sky-birds-hd-wallpaper-preview.jpg",
"https://p4.wallpaperbetter.com/wallpaper/457/620/4/anime-anime-girls-minimalism-hd-wallpaper-preview.jpg",
"https://p4.wallpaperbetter.com/wallpaper/608/626/387/sea-autumn-landscape-sunset-nature-hd-wallpaper-preview.jpg",
"https://p4.wallpaperbetter.com/wallpaper/879/899/652/sea-white-dom-flight-blue-hd-wallpaper-preview.jpg"
]

const chosenimage = images[Math.floor(Math.random()*images.length)]

const bgImage = document.createElement("img")
bgImage.src = chosenimage
document.body.appendChild(bgImage)