package models;

public class WaterPokemon extends Pokemon {
    //Note: dit is BS; alle pokemons kunnen alle eigenschappen bevatten
    private String food;
    private String sound;

    public WaterPokemon(String name, int level) {
        super(name, level);
    }

    public String getFood() {
        return food;
    }

    public void setFood(String food) {
        this.food = food;
    }

    public String getSound() {
        return sound;
    }

    public void setSound(String sound) {
        this.sound = sound;
    }

    @Override
    public void speak() {
        System.out.println("Hi I am a waterpokemon");
    }

    //attacks
    public void surf(Pokemon pokemon) {
        this.attack(20, pokemon);
    }

    public void hydroPump(Pokemon pokemon) {
        this.attack(80, pokemon);
    }
}
