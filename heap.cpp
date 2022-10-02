#include<iostream>
using namespace std;

int main() {
    for (int i = heap.size()-1; i >= 0; i--)
   {
      swap(heap[0],heap[i]);
      res.push_back(heap[i]);
      heap.pop_back();

      int root = 0;
      int c;
      
      do
      {
         c = (root*2)+1;
         if (heap[c] < heap[c + 1])
         {
            c++;
         }
         if (heap[root] < heap[c])
         {
            swap(heap[root], heap[c]);
         }         
         else break;
         root = c;

      }while((root*2)+2 < heap.size());
   }
}