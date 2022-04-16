import classes from './MealsSummary.module.css';

const MealsSummary =() => {
    return(
        <section className={classes.summary}>
            <h2>Let's Order Pupusas!!!</h2>
            <p>
                Our Client: Pupusas La Paciencia is offering to you the best Pupusas
                in Town, what are you waiting for??? Let's Order!
            </p>
            <p>
                Our dishes are prepared with the best organic ingredients from El Salvador,
                you may find nutritional facts in any product, we think in our customers so you may
                customized almost any ingredient of your favorite specialite.
            </p>
        </section>
    );
}

export default MealsSummary;