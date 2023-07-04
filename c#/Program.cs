class Program {
  static void Main(string[] args) {
    Child c = new Child();
    c.Print();
  }
}
interface Ifunc
{
  void Print();  
}

class Parent : Ifunc
{
    public virtual void Print() {
        Console.WriteLine("Parent");
    }
}

class Child : Parent
{
    
    // public override void Print() {
    //     Console.WriteLine("Child");
    // }
}

