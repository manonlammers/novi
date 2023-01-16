public class GrassPokemon extends Pokemon{
    public GrassPokemon(String name, int level, int hp, String food, String sound) {
        super(name, level, hp, food, sound);

        this.attacks.add("leafStorm");
        this.attacks.add("solarBeam");
        this.attacks.add("leechSeed");
        this.attacks.add("leaveBlade");
    }

    @Override
    public String getType() {
        return "grass";
    }

    @Override
    public int getAttackDamage(int damage, Pokemon enemy) {
        switch (enemy.getType()) {
            case "electric": return damage * 3;
            case "fire": return (int) (damage * 1.5);
            case "water": return (int) (damage * 1.25);
            default: return damage;
        }
    }

    public void leafStorm(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(10, enemy);
        this.attack(name, enemy, "leafStorm", damage);
    }

    public void solarBeam(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(15, enemy);
        this.attack(name, enemy, "solarBeam", damage);
    }

    public void leechSeed(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(20, enemy);
        this.attack(name, enemy, "leechSeed", damage);
    }

    public void leaveBlade(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(25, enemy);
        this.attack(name, enemy, "leaveBlade", damage);
    }
}
