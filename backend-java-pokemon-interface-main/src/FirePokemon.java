public class FirePokemon extends Pokemon {

    public FirePokemon(String name, int level, int hp, String food, String sound) {
        super(name, level, hp, food, sound);

        this.attacks.add("inferno");
        this.attacks.add("pyroBall");
        this.attacks.add("fireLash");
        this.attacks.add("flameThrower");
    }

    @Override
    public String getType() {
        return "fire";
    }

    @Override
    public int getAttackDamage(int damage, Pokemon enemy) {
        switch (enemy.getType()) {
            case "grass": return damage * 2;
            case "water": return (int) (damage * 1.5);
            case "electric": return (int) (damage * 1.25);
            default: return damage;
        }
    }

    public void inferno(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(10, enemy);
        this.attack(name, enemy, "inferno", damage);
    }

    public void pyroBall(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(15, enemy);
        this.attack(name, enemy, "pyroBall", damage);
    }

    public void fireLash(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(20, enemy);
        this.attack(name, enemy, "fireLash", damage);
    }

    public void flameThrower(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(25, enemy);
        this.attack(name, enemy, "flameThrower", damage);
    }
}
