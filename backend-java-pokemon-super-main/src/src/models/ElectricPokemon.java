package models;

public class ElectricPokemon extends Pokemon {

    private String special;
    private String accuracy;
    public ElectricPokemon(String name, int level) {
        super(name, level);
    }

    public String getSpecial() {
        return special;
    }

    public void setSpecial(String special) {
        this.special = special;
    }

    public String getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(String accuracy) {
        this.accuracy = accuracy;
    }

    @Override
    public void speak() {
        System.out.println("Hi I am a electric pokemon");
    }

    public void thunderPunch(Pokemon pokemon) {
        this.attack(50, pokemon);
    }

    public void electroBall (Pokemon pokemon) {
        this.attack(20, pokemon);
    }
}
