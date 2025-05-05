import Typewriter from "typewriter-effect";

const Ingredients = () => (
  <code className="h-[115px] text-center leading-loose">
    <Typewriter
      options={{ delay: 40 }}
      onInit={(typewriter) => {
        typewriter
          .pauseFor(2000)
          .typeString("<span class='text-blue-500'>const </span>")
          .typeString("bagombeka_job: Array<")
          .typeString("<span class='text-green-500'>Ingredient</span>")
          .typeString("> ")
          .typeString("<span class='text-blue-500'>= </span>")
          .typeString("[<br>")
          .typeString("<span class='pl-5'></span>")
          .typeString("<span class='text-red-500'>Software Engineer</span>, ")
          .typeString("<span class='text-red-500'>Author</span>, ")
          .typeString("<span class='text-red-500'>Photographer</span>,<br>")
          .typeString("<span class='pl-5'></span>")
          .typeString("<span class='text-green-500'>I think</span>, ")
          .typeString("<span class='text-green-500'>I create</span>, ")
          .typeString("<span class='text-green-500'>...withsomeMusic</span>,<br>")
          .typeString("];")
          .start();
      }}
    />
  </code>
);

export default Ingredients;
