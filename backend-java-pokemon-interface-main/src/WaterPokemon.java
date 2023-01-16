public class WaterPokemon extends Pokemon {
    public WaterPokemon(String name, int level, int hp, String food, String sound) {
        super(name, level, hp, food, sound);

        this.attacks.add("surf");
        this.attacks.add("hydroPump");
        this.attacks.add("hydroCanon");
        this.attacks.add("rainDance");
    }

    @Override
    public String getType() {
        return "water";
    }

    @Override
    public int getAttackDamage(int damage, Pokemon enemy) {
        switch (enemy.getType()) {
            case "fire": return damage * 3;
            case "electric": return (int) (damage * 1.5);
            case "water": return (int) (damage * 1.25);
            default: return damage;
        }
    }

    public void surf(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(10, enemy);
        this.attack(name, enemy, "surf", damage);
    }

    public void hydroPump(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(15, enemy);
        this.attack(name, enemy, "hydroPump", damage);
    }

    public void hydroCanon(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(20, enemy);
        this.attack(name, enemy, "hydroCanon", damage);
    }

    public void rainDance(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(25, enemy);
        this.attack(name, enemy, "rainDance", damage);
    }
}
