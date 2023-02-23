import java.util.ArrayList;
import java.util.List;

public abstract class Pokemon {
    private String name;
    private int hp;
    private int level;
    private String food;
    private String sound;
    protected ArrayList<String> attacks;

    public Pokemon(String name, int level, int hp, String food, String sound) {
        this.name = name;
        this.level = level;
        this.hp = hp;
        this.food = food;
        this.sound = sound;
        this.attacks = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public int getHp() {
        return hp;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public int getLevel() {
        return level;
    }

    public String getFood() {
        return food;
    }

    public String getSound() {
        return sound;
    }

    // Methods
    public List<String> getAttacks() {
        return attacks;
    }

    public abstract String getType();

    public abstract int getAttackDamage(int damage, Pokemon enemy);
    protected void attack(Pokemon name, Pokemon enemy, String attackType, int damage) {
        System.out.println(name.getName() + " attacks " + enemy.getName() + " with " + attackType);
        String enemyType = enemy.getType();

        if (enemyType.equals("electric") && attackType.equals("rainDance")) {
            System.out.println(attackType + " has not effect on " + enemy.getName());
            System.out.println(enemy.getName() + " has " + enemy.getHp() + " remaining");
        } else if (
            (enemyType.equals("grass") && attackType.equals("rainDance")) ||
            (enemyType.equals("electric") && attackType.equals("thunder"))
        ) {
            enemy.setHp(enemy.getHp() + damage);
            System.out.println(enemy.getName() + " gained " + damage + " hp");
            System.out.println(enemy.getName() + " has " + enemy.getHp() + " remaining");
        } else {
            enemy.setHp(enemy.getHp() - damage);
            System.out.println(enemy.getName() + " lost " + damage + " hp");
            System.out.println(enemy.getName() + " has " + enemy.getHp() + " remaining");

            if (attackType.equals("leechSeed")) {
                name.setHp(name.getHp() + damage);
                System.out.println(name.getName() + " absorbed " + damage);
                System.out.println(name.getName() + " now has " + name.getHp() + " remaining");
            }
        }
    }
}
