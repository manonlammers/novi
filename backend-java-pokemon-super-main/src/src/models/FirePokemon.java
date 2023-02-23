package models;

public class FirePokemon extends Pokemon {
    //Note: dit is BS; alle pokemons kunnen alle eigenschappen bevatten
    private double height;
    private double weight;

    public FirePokemon(String name, int level) {
        super(name, level);
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    @Override
    public void speak() {
        System.out.println("Hi I am a fire pokemon");
    }

    //attacks
    public void inferno(Pokemon pokemon) {
        this.attack(20, pokemon);
    }

    public void fireLash(Pokemon pokemon) {
        this.attack(40, pokemon);
    }
}


