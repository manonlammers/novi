package models;

public class Pokemon {
    private String name;
    private int level;
    private double hp;

    private boolean isAlive;

    public Pokemon(String name, int level) {
        this.name = name;
        this.level = level;
        this.hp = 100;
        this.isAlive = true;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public double getHp() {
        return hp;
    }

    public boolean getIsAlive() {
        return isAlive;
    }

    public void setIsAlive(boolean isAlive) {
        this.isAlive = isAlive;
    }

    public void setHp(double hp) {
        this.hp = hp;

        if(this.hp <= 0) {
            this.isAlive = false;
            this.hp = 0;
        }
    }

    public void speak() {
        System.out.println("I am a pokemon");
        this.isAlive = false;
    }

    public void attack(double damage, Pokemon pokemon) {
        if (!this.isAlive || !pokemon.isAlive) return;

        double currentHP = pokemon.getHp();
        pokemon.setHp(currentHP - damage);

        System.out.println(this.name + " attacked: " + pokemon.name);
        System.out.println(pokemon.name + " has " + pokemon.hp + " hp left. ");

        if (!pokemon.isAlive) {
            System.out.println(pokemon.name + " has lost the battle");
        }
    }
}
