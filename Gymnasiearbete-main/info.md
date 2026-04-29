# videos/hemsidor jag använde mig av
- https://www.youtube.com/watch?v=BmO4NvsmU6s&t=71s
för startsidan med video som gör en transition till content

- https://www.w3schools.com/html/default.asp


# video/bild filer Alla videor/bilder är royalty free
- https://pixabay.com/videos/plant-watering-grow-gardening-ewer-5635/

# För att starta test mätningar
# (kolla så terminalen är i gymnasiearbete-main för den brukar inte börja på den filen)
- i terminalen skriv "python server.py" för att starta.
 
- i en annan terminal (+ tecknet) skriv:

Invoke-WebRequest -Uri http://127.0.0.1:5000/skicka -Method POST -ContentType "application/json" -Body '{"vaxt_id": "Vaxt 1", "fuktvarde": 25}'

- du kan byta ut Vaxt 1 till 2 eller 3 och ändra fuktvarde till mer. de går upp till 100%.
- gränserna ska vara 0-30% röd, 31-60 gul och 61-100% grön

