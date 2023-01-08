import models.ElectricPokemon;
import models.FirePokemon;
import models.GrassPokemon;
import models.WaterPokemon;

public class Main {
    public static void main(String[] args) {
        FirePokemon charizard = new FirePokemon("Charizard", 70);
        ElectricPokemon pikachu = new ElectricPokemon("Pikachu", 100);
        GrassPokemon venusaur = new GrassPokemon("Venusaur", 80);
        WaterPokemon blastoise = new WaterPokemon("blastoise", 50);

        charizard.speak();
        pikachu.speak();
        venusaur.speak();
        blastoise.speak();

        //Pikachu vs Venusaus (who is going to win?)
            pikachu.thunderPunch(venusaur);
            venusaur.leafStorm(pikachu);

            pikachu.electroBall(venusaur);
            venusaur.leechSeed(pikachu);

            pikachu.thunderPunch(venusaur);
            venusaur.leafStorm(pikachu);

        //Charizard vs blastoise (who is going to win?)
            charizard.fireLash(blastoise);
            blastoise.hydroPump(charizard);

            charizard.inferno(blastoise);
            blastoise.surf(charizard);

            charizard.fireLash(blastoise);
            blastoise.hydroPump(charizard);
    }
}