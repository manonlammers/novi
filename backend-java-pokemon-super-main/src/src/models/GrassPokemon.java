package models;

public class GrassPokemon extends Pokemon {
    //Note: dit is BS; alle pokemons kunnen alle eigenschappen bevatten
    private String defence;
    private String attack;
    public GrassPokemon(String name, int level) {
        super(name, level);
    }

    public String getDefence() {
        return defence;
    }

    public void setDefence(String defence) {
        this.defence = defence;
    }

    public String getAttack() {
        return attack;
    }

    public void setAttack(String attack) {
        this.attack = attack;
    }

    @Override
    public void speak() {
        System.out.println("Hi I am a grass pokemon");
    }

    public void leafStorm(Pokemon pokemon) {
        this.attack(20, pokemon);
    }

    public void leechSeed(Pokemon pokemon) {
        this.attack(40, pokemon);
    }
}
