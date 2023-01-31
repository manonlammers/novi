public class ElectricPokemon extends Pokemon {
    public ElectricPokemon(String name, int level, int hp, String food, String sound) {
        super(name, level, hp, food, sound);

        this.attacks.add("thunderPunch");
        this.attacks.add("electroBall");
        this.attacks.add("thunder");
        this.attacks.add("voltTackle");
    }

    @Override
    public String getType() {
        return "electric";
    }

    @Override
    public int getAttackDamage(int damage, Pokemon enemy) {
        switch (enemy.getType()) {
            case "water": return damage * 3;
            case "grass": return (int) (damage * 1.5);
            case "fire": return (int) (damage * 1.25);
            default: return damage;
        }
    }

    public void thunderPunch(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(10, enemy);
        this.attack(name, enemy, "thunderPunch", damage);
    }

    public void electroBall(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(15, enemy);
        this.attack(name, enemy, "electroBall", damage);
    }

    public void thunder(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(20, enemy);
        this.attack(name, enemy, "thunder", damage);
    }

    public void voltTackle(Pokemon name, Pokemon enemy) {
        int damage = this.getAttackDamage(25, enemy);
        this.attack(name, enemy, "voltTackle", damage);
    }
}
